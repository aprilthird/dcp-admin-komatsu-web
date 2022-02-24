import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseAlertService } from "@fuse/components/alert";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Perfil } from "../perfiles/perfiles.types";
import { CrearUsuarioService } from "./crear-usuario.service";

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
      .map((control) => control.value)
      // total up the number of checked checkboxes
      .reduce((prev, next) => (next ? prev + next : prev), 0);

    // if the total is not greater than the minimum, return the error message
    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}

function minSelectedPlataforma() {
  const validator: ValidatorFn = (formControl: FormControl) => {
    if (!formControl.parent) return null;
    const form = formControl.parent.value;

    return form.web || form.movil ? null : { required: true };
  };

  return validator;
}

@Component({
  selector: "app-crear-usuario",
  templateUrl: "./crear-usuario.component.html",
  styleUrls: ["./crear-usuario.component.scss"],
})
export class CrearUsuarioComponent implements OnInit, OnDestroy {
  isEdit: boolean = false;
  loading$: Observable<boolean>;
  alert: any;

  perfiles: Perfil[] = [];

  form: FormGroup = this.fb.group({
    usr: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9s]+")]],
    psw: ["", Validators.required],
    nombres: ["", Validators.required],
    apellidos: ["", Validators.required],
    correo: ["", [Validators.required, Validators.email]],
    roles: [],
    plataformas: new FormArray(
      [new FormControl(false), new FormControl(false)],
      minSelectedCheckboxes(1)
    ),
    usuarioRoles: new FormArray([], minSelectedCheckboxes(1)),
  });

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  get rolesFormArray() {
    return this.form.controls.usuarioRoles as FormArray;
  }

  get plataformaFormArray() {
    return this.form.controls.plataformas as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private crearUsuarioService: CrearUsuarioService,
    private activatedRoute: ActivatedRoute
  ) {
    this.loading$ = this.crearUsuarioService.loading$.pipe(
      takeUntil(this._unsubscribeAll)
    );

    this.crearUsuarioService.perfiles$.subscribe((perfiles) => {
      this.perfiles = perfiles;
      this.perfiles.forEach(() =>
        this.rolesFormArray.push(new FormControl(false))
      );
    });

    if (this.activatedRoute.snapshot.params.id) {
      this.isEdit = true;
      this.crearUsuarioService
        .getUsuario(this.activatedRoute.snapshot.params.id)
        .subscribe((response) => {
          const { usr, nombres, apellidos, correo, usuarioRoles, web, movil } =
            response.body;
          this.form.setValue({
            usr,
            nombres,
            apellidos,
            correo,
            psw: "",
            roles: usuarioRoles,
            usuarioRoles: this.generateRoles(usuarioRoles),
            plataformas: [web, movil],
          });
          this.form.addControl(
            "id",
            new FormControl(this.activatedRoute.snapshot.params.id)
          );
        });
    }
  }

  ngOnInit(): void {}

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  generateRoles(roles) {
    const response = Array(this.perfiles.length).fill(false);
    roles.forEach((rol) => {
      const findIndex = this.perfiles.findIndex(
        (perfil) => rol.idRol === perfil.id
      );
      response[findIndex] = rol.activo;
    });

    return response;
  }

  onSubmit() {
    if (this.form.valid) {
      const body = { ...this.form.value };
      const { plataformas } = body;

      const requestRoles = [];

      body.usuarioRoles.forEach((e, i) => {
        const newRol = {
          idRol: this.perfiles[i].id,
          activo: e,
          idUsuario: this.isEdit
            ? Number(this.activatedRoute.snapshot.params.id)
            : 0,
        };

        const findRol = body.roles
          ? body.roles.find((role) => role.idRol === this.perfiles[i].id)
          : -1;
        if (typeof findRol !== "undefined") {
          // Se está actualizando el rol
          newRol["id"] = findRol.id;
        } else if (typeof findRol === "undefined" && e) {
          // Se está agregando un nuevo rol
          newRol["id"] = 0;
        }

        if (typeof newRol["id"] !== "undefined") {
          requestRoles.push(newRol);
        } else {
          newRol["id"] = 0;
          requestRoles;
        }
      });

      body.usuarioRoles = requestRoles;

      this.crearUsuarioService
        .saveUsuario({ ...body, web: plataformas[0], movil: plataformas[1] })
        .subscribe((response) => {
          this.alert = {
            type: response.success ? "success" : "error",
            message: response.success
              ? `Se ha ${
                  this.isEdit ? "editado" : "creado"
                } correctamente el usuario`
              : response.message,
          };

          setTimeout(() => {
            this.alert = null;
          }, 7000);
        });
    }
  }

  getErrorMessage(input: string) {
    const control = this.form.get(input);

    if (control.hasError("required")) {
      return "Campo requerido";
    }

    if (control.hasError("pattern")) {
      return "Campo solo alfanumérico";
    }

    return control.hasError("email") ? "Formato de correo incorrecto" : "";
  }
}

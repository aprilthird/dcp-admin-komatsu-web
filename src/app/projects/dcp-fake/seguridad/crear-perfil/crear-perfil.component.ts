import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CrearPerfilService } from "./create-perfil.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-crear-perfil",
  templateUrl: "./crear-perfil.component.html",
  styleUrls: ["./crear-perfil.component.scss"],
})
export class CrearPerfilComponent implements OnInit {
  isEdit: boolean = false;
  loading:boolean = false;
  alert: any;

  form: FormGroup = this.fb.group({
    nombre: ["", Validators.required],
  });

  public list: any[] = [];

  constructor(
    private _activitedRoute: ActivatedRoute,
    private _createPerfilService: CrearPerfilService,
    private fb: FormBuilder
  ) {

    if (this._activitedRoute.snapshot.params.id){ 
      this.isEdit = true;
      this._createPerfilService
        .getObtenerPerfil(this._activitedRoute.snapshot.params.id)
        .subscribe((response) => {
          if (response.body[0]) {
            this.form.setValue({
              nombre: response.body[0].nombre,
            });
          }
        });
    }

    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    this._createPerfilService.menu$.subscribe((response: any) => {
      const generateSubMenu = (currentMenu, level) => {
        const response = {
          title: currentMenu.nombre,
          level,
          id: currentMenu.idOpcionRol,
          idOpcion: currentMenu.idOpcion,
          esAccion: currentMenu.esAccion,
          activo: currentMenu.activo,
          children: [],
        };

        if (currentMenu.subMenu.length > 0) {
          currentMenu.subMenu.forEach((element) => {
            response["children"].push(generateSubMenu(element, level + 1));
          });
        }

        return response;
      };

      let TREE_DATA = [];
      response.forEach((element) => {
        TREE_DATA.push(generateSubMenu(element, 1));
      });

      this.list = TREE_DATA;
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.form.valid && !this.loading) {
      this.loading = true;
      this._createPerfilService
      .savePerfil({
        ...(this._activitedRoute.snapshot.params.id ? {id: this._activitedRoute.snapshot.params.id}: {}),
        ...this.form.value,
      })
      .subscribe((response) => {
          this.loading = false;
          this.alert = {
            type: response.success ? "success" : "error",
            message: response.success
              ? `Se ha ${
                  this.isEdit ? "editado" : "creado"
                } correctamente el perfil`
              : response.message,
          };

          setTimeout(() => {
            this.alert = null;
          }, 7000);
        });
    }
  }

  clickCheckbox(value) {
    this._createPerfilService.updateOpcion(value.id, value.id === 0 ? {
      id: Number(this._activitedRoute.snapshot.params.id),
      idOpcion: value.idOpcion,
      activo: true,
    }: {
      id: Number(this._activitedRoute.snapshot.params.id),
      idOpcion: value.idOpcion,
      activo: !value.activo,
    }).subscribe((response) => {
      if (value.id === 0)
        value.activo = true;
      value.id = response.body
    });
  }

  getErrorMessage(input: string) {
    const control = this.form.get(input);

    if (control.hasError("required")) {
      return "Campo requerido";
    }

    return control.hasError("email") ? "Formato de correo incorrecto" : "";
  }
}

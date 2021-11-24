import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EditarPerfilService } from "./editar-perfil.service";

@Component({
  selector: "app-editar-perfil",
  templateUrl: "./editar-perfil.component.html",
  styleUrls: ["./editar-perfil.component.scss"],
})
export class EditarPerfilComponent implements OnInit {
  isEdit: boolean = false;
  loading: boolean = false;
  alert: any;

  form: FormGroup = this.fb.group({
    nombre: ["", Validators.required],
    activo: [""],
  });

  public list: any[] = [];
  loadingCheckbox: boolean;
  validTree = false;
  currentParentSelected: number;
  activeCurrentParentSelected: boolean;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _editarPerfilService: EditarPerfilService,
    private _router: Router,
    private fb: FormBuilder
  ) {
    if (this._activatedRoute.snapshot.params.id) {
      if (!localStorage.getItem("nuevo_perfil")) {
        this.isEdit = true;
      }

      this._editarPerfilService
        .getObtenerPerfil(this._activatedRoute.snapshot.params.id)
        .subscribe((response) => {
          if (response.body[0]) {
            this.form.setValue({
              nombre: response.body[0].nombre,
              activo: response.body[0].activo,
            });
          }
        });
    }

    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    this._editarPerfilService.menu$.subscribe((response: any) => {
      const generateSubMenu = (currentMenu, level, index) => {
        const response = {
          title: currentMenu.nombre,
          level,
          id: currentMenu.idOpcionRol,
          idOpcion: currentMenu.idOpcion,
          esAccion: currentMenu.esAccion,
          activo: currentMenu.activo,
          children: [],
          index: index,
        };

        if (currentMenu.subMenu && currentMenu.subMenu.length > 0) {
          currentMenu.subMenu.forEach((element) => {
            response["children"].push(
              generateSubMenu(element, level + 1, index)
            );
          });
        }

        return response;
      };

      let TREE_DATA = [];
      response.forEach((element, index) => {
        TREE_DATA.push(generateSubMenu(element, 1, index));
      });

      this.list = TREE_DATA;
    });
  }

  loopData(data): void {
    for (let i = 0; i < data.length; i++) {
      if (this.validTree) {
        break;
      }
      if (data[i].children.length > 0) {
        this.loopData(data[i].children);
      } else {
        if (data[i].activo) {
          this.validTree = true;
        }
      }
      if (this.validTree) {
        break;
      }
    }
  }

  ngOnInit() {}

  onSubmit() {
    if (this.form.valid && !this.loading) {
      this.loading = true;
      this._editarPerfilService
        .savePerfil({
          ...(this._activatedRoute.snapshot.params.id
            ? { id: this._activatedRoute.snapshot.params.id }
            : {}),
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
            localStorage.removeItem("nuevo_perfil");
            this.alert = null;
            this._router.navigateByUrl("/admin/ajustes/perfiles");
          }, 2500);
        });
    }
  }

  clickCheckbox(value) {
    value.activo = !value.activo;

    if (value.level === 1 && value.activo) {
      this.currentParentSelected = value.id;
      this.activeCurrentParentSelected = true;
    }

    this.sendCheckRequest(value);

    if (value.activo) {
      let parent = this.list.find((x) => x.index === value.index);
      parent.activo = true;
      this.sendCheckRequest(parent);
    }
    if (value.children.length > 0 && value.activo) {
      this.selectAll(value.children, true);
    } else if (value.children.length > 0 && !value.activo) {
      this.selectAll(value.children, false);
    }

    setTimeout(() => {
      this.loopData(this.list);
    }, 2000);
  }

  private sendCheckRequest(value): void {
    this.loadingCheckbox = true;
    let enable = true;

    if (
      this.currentParentSelected === value.id &&
      this.activeCurrentParentSelected
    ) {
      this.activeCurrentParentSelected = false;
      enable = false;
    }

    if (enable) {
      this._editarPerfilService
        .updateOpcion(
          value.id,
          value.id === 0
            ? {
                id: Number(this._activatedRoute.snapshot.params.id),
                idOpcion: value.idOpcion,
                activo: false,
              }
            : {
                id: Number(this._activatedRoute.snapshot.params.id),
                idOpcion: value.idOpcion,
                activo: value.activo,
              }
        )
        .subscribe((response) => {
          if (value.id === 0) value.activo = true;
          value.id = response.body;
          this.loadingCheckbox = false;
        });
    }
  }

  private selectAll(value, all): void {
    value.map((x) => {
      x.activo = !all ? false : true;
      this.sendCheckRequest(x);
      if (x.children.length > 0) {
        x.children.map((y) => {
          y.activo = !all ? false : true;
          this.sendCheckRequest(y);
        });
      }
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

export const InputValidators = {
  errorOutput: {
    REQUIRED: "Campo requerido",
    DNI: "Formato de DNI inválido",
    EMAIL: "Formato de Correo inválido",
    MIN: "Mínimo ",
    MAX: "Máximo ",
    ALLOWED: " caracteres permitidos",
  },

  DNI_PATTERN: "/^\\d{8}(?:[-\\s]\\d{4})?$/",
};

using Application.DTOs.UserDTOs;
using FluentValidation;

namespace Application.Validators
{
    /// <summary>
    /// Classe responsável por realizar toda a validação necessária o usuário
    /// </summary>
    public class UserDTOValidator : AbstractValidator<UserDTO>
    {
        public UserDTOValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Nome inválido")
                .MaximumLength(200).WithMessage("Limite máximo para o tamanho de nome atingido");

            RuleFor(x => x.Age)
                .GreaterThan(0).WithMessage("Idade inválida");
        }
    }
}

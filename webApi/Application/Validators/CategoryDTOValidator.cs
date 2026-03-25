using Application.DTOs.CategoryDTOs;
using FluentValidation;

namespace Application.Validators
{
    /// <summary>
    /// Classe responsável por realizar toda a validação necessária para Categoria
    /// </summary>
    public class CategoryDTOValidator : AbstractValidator<CategoryDTO>
    {
        public CategoryDTOValidator()
        {
            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Descrição inválida")
                .MaximumLength(400).WithMessage("Limite máximo para o tamanho da descrição atingida");

            RuleFor(x => x.Purpose)
                .IsInEnum().WithMessage("A finalidade informada é inválida.")
                .NotEmpty().WithMessage("A finalidade deve ser selecionada.");
        }
    }
}

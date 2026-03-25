using Application.DTOs.TransactionDTOs;
using Application.Services.Interfaces;
using Domain.Enums;
using FluentValidation;

namespace Application.Validators
{
    /// <summary>
    /// Validador para TransactionDTO
    /// </summary>
    public class TransactionDTOValidator : AbstractValidator<TransactionDTO>
    {
        private readonly IUserService _userService;
        private readonly ICategoryService _categoryService;

        public TransactionDTOValidator(IUserService userService, ICategoryService categoryService)
        {
            _userService = userService;
            _categoryService = categoryService;

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Descrição é obrigatória")
                .MaximumLength(400).WithMessage("Descrição deve ter no máximo 400 caracteres");

            RuleFor(x => x.Value)
                .GreaterThan(0).WithMessage("Valor deve ser positivo");

            RuleFor(x => x.Type)
                .IsInEnum().WithMessage("Tipo de transação inválido");

            RuleFor(x => x.UserId)
                .NotEmpty().WithMessage("Usuário é obrigatório")
                .MustAsync(UserExists).WithMessage("Usuário não encontrado");

            RuleFor(x => x)
                .MustAsync(UserCanUseType).WithMessage("Menores de idade só podem cadastrar despesas")
                .MustAsync(CategoryMatchesType).WithMessage("Categoria incompatível com o tipo da transação");
        }


        // Função para verificar se o usuário existe
        private async Task<bool> UserExists(Guid userId, CancellationToken cancellationToken)
        {
            var user = await _userService.GetByIdAsync(userId);
            return user != null;
        }


        // Função para verificar se o usuário for menor de idade então transação não pode ser do tipo receita
        private async Task<bool> UserCanUseType(TransactionDTO dto, CancellationToken cancellationToken)
        {
            var user = await _userService.GetByIdAsync(dto.UserId);
            if (user == null) return false;

            if (user.Age < 18 && dto.Type != ETransactionType.Expense)
                return false;

            return true;
        }

        private async Task<bool> CategoryMatchesType(TransactionDTO dto, CancellationToken cancellationToken)
        {
            if (!dto.CategoryId.HasValue) return true; // categoria é opcional

            var category = await _categoryService.GetByIdAsync(dto.CategoryId.Value);
            if (category == null) return false;


            // Agora, se categoria existe, a transação tem que ser necessariamente do mesmo tipo da categoria
            return category.Purpose switch
            {
                EPurposeType.Expense => dto.Type == ETransactionType.Expense,
                EPurposeType.Income => dto.Type == ETransactionType.Income,
                _ => true
            };
        }
    }
}
using Domain.Enums;

namespace Application.DTOs.TransactionDTOs
{
    /// <summary>
    /// Representa a entidade de transferência de Transação
    /// (contendo Description, Value, Type, CategoryId e UserId).
    /// </summary>
    public class TransactionDTO
    {
        public required string Description { get; set; }
        public required decimal Value { get; set; }
        public required ETransactionType Type { get; set; }

        // Categoria é opcional
        public Guid? CategoryId { get; set; }

        // Usuário é obrigatório
        public required Guid UserId { get; set; }
    }
}

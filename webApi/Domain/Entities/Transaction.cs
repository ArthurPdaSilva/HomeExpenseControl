using Domain.Enums;

namespace Domain.Entities
{
    /// <summary>
    /// Representa a entidade de persistência de Transação
    /// </summary>
    public class Transaction
    {
        public Guid Id { get; set; }
        public required string Description { get; set; }
        public required decimal Value { get; set; }
        public required ETransactionType Type { get; set; }
        // Relação 1X1 com categoria
        public required Guid CategoryId { get; set; }
        public required Category Category { get; set; }

        // Relação 1XN com usuário
        public required Guid UserId { get; set; }
        public required User User { get; set; }

        public required bool IsDeleted { get; set; }
    }
}

using Domain.Enums;

namespace Application.DTOs.TransactionDTOs
{
    public class TransactionListDTO
    {
        public required Guid Id { get; set; }
        public required string Description { get; set; }
        public required decimal Value { get; set; }
        public required ETransactionType Type { get; set; }
        public Guid? CategoryId { get; set; }
    }
}
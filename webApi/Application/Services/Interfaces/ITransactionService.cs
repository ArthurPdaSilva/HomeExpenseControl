using Application.DTOs.TransactionDTOs;

namespace Application.Services.Interfaces
{
    /// <summary>
    /// Interface que delimita as funções que as Transações terá
    /// </summary>
    public interface ITransactionService : IGenericService<TransactionDTO, TransactionListDTO>
    {
    }
}

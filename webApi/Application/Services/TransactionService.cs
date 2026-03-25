using Application.DTOs.TransactionDTOs;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Repositories.Interfaces;
using FluentValidation;

namespace Application.Services
{
    /// <summary>
    /// Serviço responsável por realizar as operações e validações envolvendo a entidade de Transação
    /// </summary>
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _transactionRepository;
        private readonly IValidator<TransactionDTO> _validator;
        private readonly IMapper _mapper;

        public TransactionService(ITransactionRepository transactionRepository, IMapper mapper, IValidator<TransactionDTO> validator)
        {
            _transactionRepository = transactionRepository;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task CreateAsync(TransactionDTO transaction)
        {
            await _validator.ValidateAndThrowAsync(transaction);
            var newTransaction = _mapper.Map<Transaction>(transaction);
            await _transactionRepository.CreateAsync(newTransaction);
        }

        public async Task<IList<TransactionListDTO>> GetAllAsync()
        {
            var transactions = await _transactionRepository.GetAllAsync();
            return _mapper.Map<IList<TransactionListDTO>>(transactions);
        }

        public async Task<TransactionDTO> GetByIdAsync(Guid id)
        {
            var transaction = await _transactionRepository.GetByIdAsync(id);
            if (transaction is null)
            {
                throw new Exception("Transação não encontrada");
            }
            return _mapper.Map<TransactionDTO>(transaction);
        }

        public Task UpdateAsync(Guid id, TransactionDTO dto)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
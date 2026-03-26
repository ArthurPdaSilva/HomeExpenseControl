using Application.DTOs.DashboardDTOs;
using Application.DTOs.TransactionDTOs;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Domain.Repositories.Interfaces;
using FluentValidation;

namespace Application.Services
{
    /// <summary>
    /// Serviço responsável por realizar as operações para pegar o total para o Dashboard, ou seja, o total de receitas, despesas e saldo.
    /// </summary>
    public class DashboardService : IDashboardService
    {
        private readonly ITransactionRepository _transactionRepository;
        //Optei por não usar o Mapper e nem o Validator, pois as operações para pegar os totais são bem simples e não tem necessidade de criar DTOs específicos para isso, já que a maioria dos dados que precisamos já estão na entidade de Transação.

        public DashboardService(ITransactionRepository transactionRepository)
        {
            _transactionRepository = transactionRepository;
        }

        public async Task<IList<CategoryDashboardDTO>> GetTotalByCategoryAsync()
        {
            //Como transaction já inclui categorias e users, podemos só dar um get all aqui
            var transactions = await _transactionRepository.GetAllAsync();
            return transactions
            .GroupBy(t => new { t.CategoryId, t.Category.Description })
            .Select(g => new CategoryDashboardDTO
            {
                CategoryId = g.Key.CategoryId,
                CategoryDescription = g.Key.Description,
                // Soma apenas se o tipo for Income (2)
                TotalIncome = g.Where(t => t.Type == ETransactionType.Income).Sum(t => t.Value),
                // Soma apenas se o tipo for Expense (1)
                TotalExpense = g.Where(t => t.Type == ETransactionType.Expense).Sum(t => t.Value),
               
            })
            .ToList();
        }

        public async Task<IList<UserDashboardDTO>> GetTotalByUserAsync()
        {
            var transactions = await _transactionRepository.GetAllAsync();
            return transactions
            .GroupBy(t => new { t.UserId, t.User.Name})
            .Select(u => new UserDashboardDTO
            {
                UserId = u.Key.UserId,
                UserName = u.Key.Name,
                TotalIncome = u.Where(t => t.Type == ETransactionType.Income).Sum(t => t.Value),
                TotalExpense = u.Where(t => t.Type == ETransactionType.Expense).Sum(t => t.Value),

            })
            .ToList();
        }
    }
}
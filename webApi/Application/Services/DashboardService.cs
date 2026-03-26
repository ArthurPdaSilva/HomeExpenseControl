using Application.DTOs.DashboardDTOs;
using Application.Services.Interfaces;
using Domain.Enums;
using Domain.Repositories.Interfaces;

namespace Application.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IUserRepository _userRepository;
        private readonly ICategoryRepository _categoryRepository;

        public DashboardService(IUserRepository userRepository, ICategoryRepository categoryRepository)
        {
            _userRepository = userRepository;
            _categoryRepository = categoryRepository;
        }

        public async Task<IList<UserDashboardDTO>> GetTotalByUserAsync()
        {
            // Buscando todos os usuários, incluindo suas transações (Tinha esquecido que precisava buscar todos os usuários e categorias tendo transações ou não).
            var users = await _userRepository.GetAllWithTransactionsAsync();

            return users.Select(u => new UserDashboardDTO
            {
                UserId = u.Id,
                UserName = u.Name,
                CreatedAt = u.CreatedAt,
                // Se não houver transações, o Sum retornará 0 automaticamente
                TotalIncome = u.Transactions
                    .Where(t => t.Type == ETransactionType.Income)
                    .Sum(t => t.Value),
                TotalExpense = u.Transactions
                    .Where(t => t.Type == ETransactionType.Expense)
                    .Sum(t => t.Value)
            }).ToList();
        }

        public async Task<IList<CategoryDashboardDTO>> GetTotalByCategoryAsync()
        {
            // Buscando todas as categorias, incluindo suas transações
            var categories = await _categoryRepository.GetAllWithTransactionsAsync();

            // Também achei que não compesava fazer um mapping aqui.
            return categories.Select(c => new CategoryDashboardDTO
            {
                CategoryId = c.Id,
                CategoryDescription = c.Description,
                CreatedAt = c.CreatedAt,
                TotalIncome = c.Transactions
                    .Where(t => t.Type == ETransactionType.Income)
                    .Sum(t => t.Value),
                TotalExpense = c.Transactions
                    .Where(t => t.Type == ETransactionType.Expense)
                    .Sum(t => t.Value)
            }).ToList();
        }
    }
}
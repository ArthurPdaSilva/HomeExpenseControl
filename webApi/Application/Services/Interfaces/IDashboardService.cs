using Application.DTOs.DashboardDTOs;
using Application.DTOs.TransactionDTOs;

namespace Application.Services.Interfaces
{
    /// <summary>
    /// Interface que delimita as funções para o Dashboard
    /// Ele não vai implementar a interfacec genérica, pois ele vai ter apenas 2 funções distintas
    /// </summary>
    public interface IDashboardService
    {
        //Função para pegar o total by user
        public Task<IList<UserDashboardDTO>> GetTotalByUserAsync();
        //Função para pegar o total by category
        public Task<IList<CategoryDashboardDTO>> GetTotalByCategoryAsync();
    }
}

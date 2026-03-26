namespace Application.DTOs.DashboardDTOs
{
    /// <summary>
    /// Como tanto usuário como categoria vão ter receita, despesa e saldo, criei essa interface para evitar repetição de código
    /// </summary>
    public class IGenericDashboardDTO
    {
        public decimal TotalIncome { get; set; }
        public decimal TotalExpense { get; set; }
        // O saldo é calculado automaticamente a partir da receita total menos a despesa total, então não precisa ser setado diretamente
        public decimal Balance => TotalIncome - TotalExpense;
    }
}

namespace Application.DTOs.DashboardDTOs
{
    /// <summary>
    /// Representa a entidade que será listada no Dashboard de Totais por Usuários
    /// </summary>
    public class UserDashboardDTO : IGenericDashboardDTO
    {
        public Guid UserId { get; set; }
        public required string UserName { get; set; }
      
    }
}

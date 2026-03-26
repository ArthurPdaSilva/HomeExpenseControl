namespace Application.DTOs.DashboardDTOs
{
    /// <summary>
    /// Representa a entidade que será listada no Dashboard de Totais por categorias
    /// </summary>
    public class CategoryDashboardDTO : IGenericDashboardDTO
    {
        public Guid CategoryId { get; set; }
        public required string CategoryDescription { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}

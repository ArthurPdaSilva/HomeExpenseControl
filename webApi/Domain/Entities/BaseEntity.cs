namespace Domain.Entities
{
    /// <summary>
    /// Representa a entidade base, criei só para não duplicar código e também ter um filtro melhor na listagem, pois dá para ordenar por data de criação
    /// </summary>
    public abstract class BaseEntity
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

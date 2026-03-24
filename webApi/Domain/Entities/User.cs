namespace Domain.Entities
{

    /// <summary>
    /// Representa a entidade de persitência do Usuário (contendo Id, Name e a Age)
    /// </summary>
    public class User
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required int Age { get; set; }
    }
}

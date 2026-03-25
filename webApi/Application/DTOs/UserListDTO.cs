namespace Application.DTOs
{

    /// <summary>
    /// Representa a entidade de transfêrencia do Usuário (contendo o Id, Name e o Age)
    /// </summary>
    public class UserListDTO
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public required int Age { get; set; }
    }
}

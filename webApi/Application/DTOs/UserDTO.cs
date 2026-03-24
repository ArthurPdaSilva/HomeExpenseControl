namespace Application.DTOs
{

    /// <summary>
    /// Representa a entidade de transfêrencia do Usuário (contendo apenas o Name e o Age)
    /// </summary>
    public class UserDTO
    {
        public required string Name { get; set; }
        public required int Age { get; set; }
    }
}

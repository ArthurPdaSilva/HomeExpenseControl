/**
 * Componente de Perfil do Usuário
 *	Como não tem sistema de autenticação, deixei só um esboço de como ficaria no sidebar
 */
export const UserPerfil = () => {
	return (
		<div className="p-4 border-t border-gray-200">
			<div className="flex items-center gap-3">
				<div className="bg-[linear-gradient(90deg,#12A2CA,#199BC7,#5A63AB)] w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium shrink-0">
					AU
				</div>
				<div className="flex-1 min-w-0">
					<p className="text-sm font-medium text-gray-900 truncate">
						Usuário Admin
					</p>
					<p className="text-xs text-gray-500 truncate">Usuário único</p>
				</div>
			</div>
		</div>
	);
};

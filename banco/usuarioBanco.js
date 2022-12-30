function usuarioBanco(conexao){
  this._conexao=conexao;
}

usuarioBanco.prototype.buscaComentarios = function(callback){
  this._conexao.query('SELECT * FROM comentarios', callback);
}

usuarioBanco.prototype.comentar = function(dados,callback){
  this._conexao.query('insert into comentarios set ?',dados,callback);
}

usuarioBanco.prototype.denuncia = function(dados,callback){
  this._conexao.query('UPDATE posts SET ? WHERE id = ?',[dados,dados.id],callback);
}

usuarioBanco.prototype.remover = function(dados,callback){
  this._conexao.query('UPDATE posts SET ? WHERE id = ?',[dados,dados.id],callback);
}

usuarioBanco.prototype.buscaEditar = function(id,callback){
  this._conexao.query('SELECT * FROM usuario WHERE id = ?',id,callback);
}
usuarioBanco.prototype.editar = function(dados,callback){
  this._conexao.query('UPDATE usuario SET ? WHERE id = ?',[dados,dados.id],callback);
}
usuarioBanco.prototype.excluir = function(id,callback){
  this._conexao.query('DELETE FROM posts WHERE id = ?',id,callback);
}
usuarioBanco.prototype.deletar = function(id,callback){
  this._conexao.query('DELETE FROM usuario WHERE id = ?',id,callback);
}

usuarioBanco.prototype.salvar = function(dados,callback){
  this._conexao.query('insert into usuario set ?', dados, callback);
}
usuarioBanco.prototype.salvarpost = function(dados,callback){
  this._conexao.query('insert into posts set ?',dados,callback);
}
usuarioBanco.prototype.denunciaPost = function(callback){
  this._conexao.query('SELECT * from posts WHERE cargo = 1',callback);
}
usuarioBanco.prototype.buscarPost = function(callback){
  this._conexao.query('SELECT * from posts',callback);
}
usuarioBanco.prototype.eventos = function(callback){
  this._conexao.query('SELECT * from posts WHERE assunto="Eventos"',callback);
}
usuarioBanco.prototype.ongs = function(callback){
  this._conexao.query('SELECT * from posts WHERE assunto="Ongs"',callback);
}
usuarioBanco.prototype.acidentes = function(callback){
  this._conexao.query('SELECT * from posts WHERE assunto="Acidentes"',callback);
}
usuarioBanco.prototype.empregos = function(callback){
  this._conexao.query('SELECT * from posts WHERE assunto="Vagas de Emprego"',callback);
}
usuarioBanco.prototype.comercios = function(callback){
  this._conexao.query('SELECT * from posts WHERE assunto="Comercios"',callback);
}
usuarioBanco.prototype.alertas = function(callback){
  this._conexao.query('SELECT * from posts WHERE assunto="Alertas"',callback);
}
usuarioBanco.prototype.buscarGeral = function(callback){
  this._conexao.query('SELECT * from usuario',callback);
}

usuarioBanco.prototype.buscarNome = function(nome, callback){
  var nome = nome.nomeBusca;
  this._conexao.query('SELECT * from usuario WHERE nome = ?',nome,callback);
}
usuarioBanco.prototype.verificaLogin = function(dados, callback){
  this._conexao.query('SELECT * FROM usuario WHERE nome_usuario = ? AND senha = ?',[dados.nome_usuario,dados.senha],callback);
}
//Edição
usuarioBanco.prototype.editarBusca = function(id_, callback){
  this._conexao.query('SELECT * FROM usuario WHERE id = ?', id_, callback);
}
usuarioBanco.prototype.editarNome = function(dados, callback) {
  this._conexao.query('UPDATE usuario SET ? WHERE id = ?', [dados,dados.id], callback);
} //tendi
//Edição da Senha
usuarioBanco.prototype.editarSenha = function(dados, callback) {
  this._conexao.query('UPDATE usuario SET ? WHERE id = ?', [dados,dados.id], callback);
}

usuarioBanco.prototype.buscPost= function(callback){
  this._conexao.query('SELECT * FROM posts WHERE nome_usuario= "Cd"', callback);
}
usuarioBanco.prototype.salvarMensagem = function(dados,callback){
  this._conexao.query('insert into tbcomentarios set ?', dados, callback);
}
usuarioBanco.prototype.GeralMensagens = function(callback){
  this._conexao.query('SELECT * from tbcomentarios',callback);
}

usuarioBanco.prototype.editarFoto = function(dados,callback){
  this._conexao.query('UPDATE usuario SET foto = ? WHERE id = ?',[dados.foto,dados.id_],callback);
}
// mas tipo, posso fazer duas busca na página
usuarioBanco.prototype.buscarInformacoes= function(id,callback){
  this._conexao.query('SELECT * FROM usuario',id, callback);
}
/*
usuarioBanco.prototype.buscarInformacoes= function(nome_usuario,callback){
  this._conexao.query('SELECT * FROM posts WHERE nome_usuario = ?',id, callback);
}*/
usuarioBanco.prototype.verificaUsuario = function(dados,callback){
  this._conexao.query('SELECT * FROM usuario WHERE nome_usuario = ?',dados.nome_usuario, callback);
}
module.exports = function(){
  return usuarioBanco;
}

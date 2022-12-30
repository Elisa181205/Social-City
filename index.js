var express = require('express');
var app = express();
var load = require('express-load');
var md5 = require('md5');
var sequelize = require("sequelize");
load('banco')
.into(app);
var bodyparser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');

const multer  = require('multer');
const crypto  = require('crypto');

const { fileLoader } = require('ejs');
const { resolve, extname } = require('path');
const { O_EXCL } = require('constants');
const upload = multer({
  storage: multer.diskStorage({
    destination: resolve(__dirname, 'uploads'),
    filename: (req, file, cb) => {
      const Hash = crypto.randomBytes(16).toString('hex')
      const name = file.originalname.split(" ").join("-")
      const filename = `${Hash}-${name}`
      return cb(null, filename)
    }
  })
});
app.set('view engine','ejs');
app.use(express.static('public'));
app.use("/uploads", express.static('uploads'));

app.use(bodyparser.urlencoded({extended:true}));
app.use(session({
  secret: 'exemplo1',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000000 }
    })
);
app.use(flash());

app.use((req, res, next) => {
    res.locals.erro = req.flash("erro")
    res.locals.sucesso = req.flash("sucesso")
    next()
});

app.get('/',function(req,res){
  /*req.flash('info', 'Flash is back!')*/
  res.render('index.ejs');
});


app.post('/comentar',function(req,res){
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.comentar(dados,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
  });
  console.log(dados);
  res.redirect('/emprego');
});
app.post('/comentar_acidente',function(req,res){
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.comentar(dados,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
  });
  console.log(dados);
  res.redirect('/acidente');
});
app.post('/comentar_evento',function(req,res){
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.comentar(dados,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
  });
  console.log(dados);
  res.redirect('/evento');
});
app.post('/comentar_ong',function(req,res){
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.comentar(dados,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
  });
  console.log(dados);
  res.redirect('/ong');
});
app.post('/comentar_comercio',function(req,res){
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.comentar(dados,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
  });
  console.log(dados);
  res.redirect('/comercio');
});
app.post('/comentar_alerta',function(req,res){
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.comentar(dados,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
  });
  console.log(dados);
  res.redirect('/alerta');
});

app.post('/denunciar_emprego',function(req,res){
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.denuncia(dados,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
  });
  res.redirect('/emprego');
});

app.post('/denunciar_acidente',function(req,res){
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.denuncia(dados,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
  });
  res.redirect('/acidente');
});

app.post('/denunciar_evento',function(req,res){
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.denuncia(dados,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
  });
  res.redirect('/evento');
});

app.post('/denunciar_ong',function(req,res){
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.denuncia(dados,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
  });
  res.redirect('/ong');
});

app.post('/denunciar_comercio',function(req,res){
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.denuncia(dados,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
  });
  res.redirect('/comercio');
});

app.post('/denunciar_alerta',function(req,res){
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.denuncia(dados,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
  });
  res.redirect('/alerta');
});



app.post('/remover',function(req,res){
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.remover(dados,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
  });
  res.redirect('/admin');
});

app.get('/sobre',function(req,res){
  res.render('sobre.ejs');
});
app.post('/form',function(req,res){
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  var cripto = md5(dados.senha);
  dados.senha = cripto;
  dados.foto = "/uploads/Original.png" ;

  usuarioBanco.verificaUsuario(dados,function(erro,sucesso){
    if(sucesso.length){
      // req.flash('erro', 'Nome de usuário já existente')
      // var mensagem = "Nome de usuario sendo usado.";
      // res.render('loginform.ejs',{'mensagem':mensagem}); //coloca mensagem aqui
    }else{
        usuarioBanco.salvar(dados,function(erro,sucesso){
        if(erro){
          console.log(erro);
        }
        else{
          res.redirect('/loginform');
        }
    });
  }
  }
);
});
app.post('/postarEmprego',function(req,res){
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.salvarpost(dados,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
  });
  console.log(dados);
  res.redirect('/emprego');
});
app.post('/postarAlerta',function(req,res){
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.salvarpost(dados,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
  });
  console.log(dados);
  res.redirect('/alerta');
});
app.post('/postarEvento',function(req,res){
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.salvarpost(dados,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
  });
  console.log(dados);
  res.redirect('/evento');
});
app.post('/postarComercio',function(req,res){
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.salvarpost(dados,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
  });
  console.log(dados);
  res.redirect('/comercio');
});
app.post('/postarOng',function(req,res){
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.salvarpost(dados,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
  });
  console.log(dados);
  res.redirect('/ong');
});
app.post('/postarAcidente',function(req,res){
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.salvarpost(dados,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
  });
  console.log(dados);
  res.redirect('/acidente');
});
app.post('/postarAlerta',function(req,res){
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.salvarpost(dados,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
  });
  console.log(dados);
  res.redirect('/alerta');
});
app.post('/postarEvento',function(req,res){
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.salvarpost(dados,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
  });
  console.log(dados);
  res.redirect('/evento');
});
app.get('/feed',function(req,res){
  var sess = req.session;
    if(sess.logado==1){
      var conexao = app.banco.conexao();
      var usuarioBanco = new app.banco.usuarioBanco(conexao);
      usuarioBanco.buscarPost(function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
    else{
      res.render('feed.ejs',{'resultado':sucesso,'cargo':sess, 'nome_usuario':sess,
      'nome':sess,'sobrenome':sess, 'email': sess, 'genero':sess,
       'foto':sess, 'id_':sess, image: `/uploads`});
    }
  });
}
  else{
    res.redirect('/loginform');
  }
});

app.get('/verpost',function(req,res){
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.buscarPost(function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
      else{
        res.render('feed2.ejs',{'resultado':sucesso});
      }
  });
});

app.get('/buscar',function(req,res){
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.buscarGeral(function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
      else{
        res.render('resultadoBusca.ejs',{'resultado':sucesso});
      }
  });
});
app.post('/buscarNome',function(req,res){
  var nome = req.body;
  if(nome.nomeBusca == ""){
    res.redirect('/buscar');
  }
    else{
      var conexao = app.banco.conexao();
      var usuarioBanco = new app.banco.usuarioBanco(conexao);
      usuarioBanco.buscarNome(nome,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }
    else{
      res.render('resultadoBusca.ejs',{'resultado':sucesso});
    }
  });
}
});

//Fazer Edição Do Nome
app.post('/FazerEdicao', function(req, res){
	var sess=req.session;
	var dados= req.body;
	var conexao = app.banco.conexao();
	var usuarioBanco= new app.banco.usuarioBanco(conexao);
	usuarioBanco.editarNome(dados, function(erro, sucesso){
    console.log(dados);
		  if(erro){
			  console.log(erro);
		}
      sess.nome_usuario= dados.nome_usuario;
		  res.redirect('/feed');
	});
   });
app.post('/pos', function(req, res){
    var sess=req.session;
    var dados= req.body;
    var conexao = app.banco.conexao();
    var usuarioBanco= new app.banco.usuarioBanco(conexao);
    usuarioBanco.salvarMensagem(dados, function(erro, sucesso){
      console.log(dados);
        if(erro){
          console.log(erro);
      }
       res.redirect('/emprego');
    });
});

   //Editar Nome de Usuário
app.get('/editarBusca/:id_', function(req,res){
var sess=req.session;
var id_ = req.params.id_;
var conexao= app.banco.conexao();
var usuarioBanco= new app.banco.usuarioBanco(conexao);
usuarioBanco.editarBusca(id_, function(erro,sucesso) {
    if(erro) return console.log(erro);
	    if(sess.logado==1){
      res.render('configuracoes.ejs', {'nome':sess.nome,
      'sobrenome':sess.sobrenome, 'email': sess.email,
       'nome_usuario':sess.nome_usuario,
      'genero':sess.genero, 'id_':sess.id_,
      'senha':sess.senha,'foto':sess.foto
    });
    }
    else{
      return res.redirect('/feed');
  }
});
});
//Fazer Edição De Senha
app.post('/EdicaoSenha', function(req, res){
  var sess=req.session;
  var dados= req.body;
  var conexao = app.banco.conexao();
  var cripto = md5(dados.senha);
  dados.senha = cripto;
  var usuarioBanco= new app.banco.usuarioBanco(conexao);
  usuarioBanco.editarSenha(dados, function(erro, sucesso){
  if(erro){
    console.log(erro);
  }
  else{
        res.redirect('/feed');
      }
});
});
//Editar Senha do usuário
app.get('/editarSenha/:id_', function(req,res){
  var sess=req.session;
  var id_ = req.params.id_;
  var conexao= app.banco.conexao();
  var usuarioBanco= new app.banco.usuarioBanco(conexao);
  usuarioBanco.editarBusca(id_, function(erro,sucesso) {
    if(sess.logado==1){
        res.render('configuracoes.ejs', {'nome':sess, 'id_':sess, 'senha':sess});
    }
    else{
      res.redirect('/login');
    }
});
});


app.get('/perfil',function(req,res){
  var sess = req.session;
  if(sess.logado==1){
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.buscarInformacoes(function(erro,sucesso){
  usuarioBanco.buscarPost(function(erro,sucesso){
    res.render('perfil.ejs',{'resultado':sucesso,'nome_usuario':sess,
    'nome':sess,'sobrenome':sess, 'email': sess, 'nome_usuario':sess,
    'genero':sess, 'foto':sess, 'id_':sess });
      });
    });
  }
  else{
    res.redirect('/loginform');
  }
  });
  app.get('/emprego',upload.single("imagem"),function(req,res){
    var sess = req.session;
    if(sess.logado==1){
    var conexao = app.banco.conexao();
    var usuarioBanco = new app.banco.usuarioBanco(conexao);
    usuarioBanco.buscaComentarios(function(erro,sucesso){
    usuarioBanco.empregos(function(erro,sucesso){
        res.render('emprego.ejs',{'resultado':sucesso,'comentario':sess,'nome_usuario':sess,
        'nome':sess,'sobrenome':sess, 'email': sess, 'genero':sess,
         'foto':sess, 'id_':sess, image: `/uploads`});
     });
     });
   }
  else{
    res.redirect('/loginform');
  }
  });
  app.get('/evento',upload.single("imagem"),function(req,res){
    var sess = req.session;
    if(sess.logado==1){
    var conexao = app.banco.conexao();
    var usuarioBanco = new app.banco.usuarioBanco(conexao);
    usuarioBanco.eventos(function(erro,sucesso){
      if(erro){
        console.log(erro);
      }else{
        res.render('evento.ejs',{'resultado':sucesso,'nome_usuario':sess,
        'nome':sess,'sobrenome':sess, 'email': sess, 'genero':sess,
         'foto':sess, 'id_':sess, image: `/uploads`});
      }
    });
  }else{
    res.redirect('/loginform');
  }
  });
  app.get('/acidente',function(req,res){
    var sess = req.session;
    if(sess.logado==1){
    var conexao = app.banco.conexao();
    var usuarioBanco = new app.banco.usuarioBanco(conexao);
    usuarioBanco.acidentes(function(erro,sucesso){
      if(erro){
        console.log(erro);
      }else{
        res.render('acidente.ejs',{'resultado':sucesso,'nome_usuario':sess,
        'nome':sess,'sobrenome':sess, 'email': sess, 'genero':sess,
         'foto':sess, 'id_':sess, image: `/uploads`});
      }
    });
  }else{
    res.redirect('/loginform');
  }
  });
  app.get('/ong',function(req,res){
    var sess = req.session;
    if(sess.logado==1){
    var conexao = app.banco.conexao();
    var usuarioBanco = new app.banco.usuarioBanco(conexao);
    usuarioBanco.ongs(function(erro,sucesso){
      if(erro){
        console.log(erro);
      }else{
        res.render('ong.ejs',{'resultado':sucesso,'nome_usuario':sess,
        'nome':sess,'sobrenome':sess, 'email': sess, 'genero':sess,
         'foto':sess, 'id_':sess, image: `/uploads`});
      }
    });
  }else{
    res.redirect('/loginform');
  }
  });
  app.get('/comercio',function(req,res){
    var sess = req.session;
    if(sess.logado==1){
    var conexao = app.banco.conexao();
    var usuarioBanco = new app.banco.usuarioBanco(conexao);
    usuarioBanco.comercios(function(erro,sucesso){
      if(erro){
        console.log(erro);
      }else{
        res.render('comercio.ejs',{'resultado':sucesso,'nome_usuario':sess,
        'nome':sess,'sobrenome':sess, 'email': sess, 'genero':sess,
         'foto':sess, 'id_':sess, image: `/uploads`});
      }
    });
  }else{
    res.redirect('/loginform');
  }
  });
  app.get('/alerta',function(req,res){
    var sess = req.session;
    if(sess.logado==1){
    var conexao = app.banco.conexao();
    var usuarioBanco = new app.banco.usuarioBanco(conexao);
    usuarioBanco.alertas(function(erro,sucesso){
      if(erro){
        console.log(erro);
      }else{
        res.render('alerta.ejs',{'resultado':sucesso,'nome_usuario':sess,
        'nome':sess,'sobrenome':sess, 'email': sess, 'genero':sess,
         'foto':sess, 'id_':sess, image: `/uploads`});
      }
    });
  }else{
    res.redirect('/loginform');
  }
  });


app.get('/avatar',function(req,res){
  res.render('configuracoes.ejs');
});
app.post("/avatar", upload.single("avatar"), function (req, res) {
  const { filename, size } = req.file;
  var sess=req.session;
  var conexao= app.banco.conexao();
  if(sess.logado==1){
    var usuarioBanco= new app.banco.usuarioBanco(conexao);
    const dados={
      id_:sess.id_, //eu coloquei tu não deixou '-' foi o professor que mandou
      foto:`/uploads/${filename}`
    }
    console.log(dados);
    usuarioBanco.editarFoto(dados, function(erro,sucesso) {
      if(erro) return console.log(erro);
      sess.foto = dados.foto;
        return res.render("feed",{'resultado':sucesso,'nome_usuario':sess,
        'nome':sess,'sobrenome':sess, 'email': sess, 'genero':sess,
         'foto':sess, 'id_':sess, image: `/uploads`});
      });
  }
  else{
        return res.redirect('/feed');
  }
});
app.get('/loginform',function(req,res){
  req.flash('erro', 'Nome de usuário já existente')
  res.render('loginform.ejs');
});
app.post('/login',function(req,res){
  var sess = req.session;
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  var cripto = md5(dados.senha);
  dados.senha = cripto;
  usuarioBanco.verificaLogin(dados, function(erro,sucesso){
    if(sucesso.length){
      sess.nome = sucesso[0].nome;
      sess.sobrenome = sucesso[0].sobrenome;
      sess.email = sucesso[0].email;
      sess.nome_usuario = sucesso[0].nome_usuario;
      sess.genero = sucesso[0].genero;
      sess.foto = sucesso[0].foto;
      sess.id_ = sucesso[0].id;
      sess.senha = sucesso[0].senha;
      sess.cargo = sucesso[0].cargo;
      sess.imagem = sucesso[0].imagem;
      sess.logado = 1;
      res.redirect('/feed');
    }else{
      res.redirect('/loginform');
    }
  })
});
app.get('/logout',function(req,res){
  var sess = req.session;
  sess.logado = 0;
  sess.destroy();
  res.redirect('/loginform');
});

app.get('/admin', function(req,res){
  var sess = req.session;
  if(sess.logado == 1 && sess.cargo == 1){
  res.render('administrador.ejs');
}else{
  res.redirect('/feed');
}
});

app.get('/admin/users', function(req,res){
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  var sess = req.session;
  if(sess.logado == 1 && sess.cargo == 1){
  usuarioBanco.buscarGeral(function(erro,sucesso){
    if(erro){
      console.log(erro);
    }else{
      res.render('users.ejs',{'resultado':sucesso});
    }
  });
}else{
  res.redirect('/feed');
}
});

app.get('/admin/postagens', function(req,res){
  var sess = req.session;
  if(sess.logado==1){
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.buscarPost(function(erro,sucesso){
    if(erro){
      console.log(erro);
    }else{
      res.render('postagens.ejs',{'resultado':sucesso,'nome_usuario':sess,
      image: `/uploads`});
    }
  });
  }else{
  res.redirect('/feed');
  }
  });

app.get('/admin/denuncias', function(req,res){
  var sess = req.session;
  if(sess.logado==1){
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.denunciaPost(function(erro,sucesso){
    if(erro){
      console.log(erro);
    }else{
      res.render('denuncias.ejs',{'resultado':sucesso,'nome_usuario':sess,
      image: `/uploads`});
    }
  });
  }else{
  res.redirect('/feed');
  }
  });

app.get('/admin/mensagens', function(req,res){
  var sess = req.session;
  if(sess.logado == 1 && sess.cargo == 1){
  res.render('mensagens.ejs');
}else{
  res.redirect('/feed');
}
});

app.post('/editar',function(req,res){
  var sess = req.session;
  if(sess.logado == 1 && sess.cargo == 1){
  var dados = req.body;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.editar(dados,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }else{
      res.redirect('/admin/users');
    }
  });
}else{
  res.redirect('/feed');
}
});

app.get('/buscaEditar/:id',function(req,res){
  var sess = req.session;
  if(sess.logado == 1 && sess.cargo == 1){
  var id = req.params.id;
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.buscaEditar(id,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }else{
      res.render('formEditar.ejs',{'resultado':sucesso});
    }
  });
}else{
  res.redirect('/feed');
} 
});

app.get('/excluir/:id',function(req,res){
  var sess = req.session;
  if(sess.logado == 1 && sess.cargo == 1){
  var id = req.params.id;
  var conexao = app.banco.conexao();
  var usuarioBanco= new app.banco.usuarioBanco(conexao);
  usuarioBanco.excluir(id,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }else{
      res.redirect('/admin/denuncias');
    }
  });
}else{
  res.redirect('/feed');
}
});

app.get('/deletar/:id',function(req,res){
  var sess = req.session;
  if(sess.logado == 1 && sess.cargo == 1){
  var id = req.params.id;
  var conexao = app.banco.conexao();
  var usuarioBanco= new app.banco.usuarioBanco(conexao);
  usuarioBanco.deletar(id,function(erro,sucesso){
    if(erro){
      console.log(erro);
    }else{
      res.redirect('/admin/users');
    }
  });
}else{
  res.redirect('/feed');
}


app.get('/perfil', function(req,res){
  var sess=req.session;
  var nome_usuario = req.params.nome_usuario;
  var conexao= app.banco.conexao();
  var usuarioBanco= new app.banco.usuarioBanco(conexao);
  usuarioBanco.buscPost(id_, function(erro,sucesso) {
    if(sess.logado==1){
        res.render('perfil.ejs', {'nome_usuario':sess.nome_usuario, 'id_':sess, 'senha':sess});
    }
    else{
      res.redirect('/login');
    }
});
});

app.get('/xuxu',function(req,res){
  var sess = req.session;
  if(sess.logado==1){
  var conexao = app.banco.conexao();
  var usuarioBanco = new app.banco.usuarioBanco(conexao);
  usuarioBanco.SelectMensagem(function(erro,sucesso){
    if(erro){
      console.log(erro);
    }else{
      res.render('feed2.ejs',{'resultado':sucesso,'nome_usuario':sess,
      'foto':sess, 'id_':sess, image: `/uploads`});
    }
  });
}else{
  res.redirect('/loginform');
}
});

});
var porta = 3000;
app.listen(porta,function(){
  console.log('Servidor rodando com sucesso');
});

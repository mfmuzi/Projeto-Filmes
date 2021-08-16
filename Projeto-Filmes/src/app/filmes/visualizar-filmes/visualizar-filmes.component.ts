import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-visualizar-filme',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.css']
})
export class VisualizarFilmesComponent implements OnInit {
  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  filme!: Filme;
  id!: number;

  constructor(public dialog: MatDialog,
	      private activatedRoute: ActivatedRoute,
              private filmesServices: FilmesService,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

editar(): void {
  this.router.navigateByUrl('/filmes/cadastro/' + this.id);
}

  excluir(): void{
    const config = {
      data: {
        titulo: 'Deseja excluir?',
        descricao: 'Caso deseja excluir, clique no botão OK',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuirBtnFechar: true
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) =>{
      if (opcao){
        this.filmesServices.excluir(this.id).subscribe(() => this.router.navigateByUrl('/filmes'));
      }
    });

  }

  private visualizar(): void{
    this.filmesServices.visualizar(this.id).subscribe((filme: Filme) => this.filme = filme);
  }

}

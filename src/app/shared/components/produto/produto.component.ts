import { ProdutoService } from './produto.service';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../utils/product';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {
  public product: Product[] = [];
  public productSelecionado: Product = new Product();

  filterTerm: string = "";

  title = 'appBootstrap';

  closeResult: string = '';

  Form = this.formBuilder.group({
    name: [],
    price: []
  });

  FormEdit = this.formBuilder.group({
    id: [],
    name: [],
    price: []
  });

  constructor(private modalService: NgbModal,
    private service: ProdutoService, private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.carregarObjetos();
  }

  carregarObjetos() {
    this.service.getAll().subscribe(
      (product: Product[]) => {
        this.product = product;
        console.log(this.product);
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  public async post(){
    await this.service.create(this.Form.value).subscribe(res => {
      console.log(res);
      this.refreshObj();
    },
    (erro) => {
      if (erro.status == 400) {
        console.log(erro);
      }
    });
  }

  public getById(product: number){
    this.service.getById(product).subscribe(res =>{
      this.productSelecionado = res;
      console.log(this.productSelecionado)
    })
  }

onSelect(selectedItem: Product) {
    this.getById(selectedItem.id); 
  }

// public async put(curso: Curso){
//     await this.cursoService.put(curso.id, curso).subscribe(res => {
//       this.refreshCurso();
//       this._toastrService.success("Registro atualizado com sucesso")
//       console.log(res);
//     },

//     (erro) => {
//       if (erro.status == 400) {
//         console.log(erro);
//         this._toastrService.error(erro.error);
//       }
//     });
//   }

  public async put(product: Product){
    await this.service.put(product).subscribe(res => {
      console.log(res);
      this.refreshObj();
    },
    (erro) => {
      if (erro.status == 400) {
        console.log(erro);
      }
    });
  }

  refreshObj(){
    this.http.get(this.service.baseUrl).toPromise()
    .then(res => this.product = res as Product[]);
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEdit(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public async delete(product: Product){
    await this.service.delete(product.id.toString()).subscribe(res => {
      this.refreshObj();
      console.log(res);
    },

    (erro) => {
      if (erro.status == 400) {
        console.log(erro);
      }
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}

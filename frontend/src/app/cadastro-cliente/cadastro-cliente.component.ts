import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroClienteService } from './cadastro-cliente.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent {
  clienteForm!: FormGroup;

  constructor(private fb: FormBuilder, private clienteService: CadastroClienteService) { }

  ngOnInit() {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      dataNascimento: [null, Validators.required],
      endereco: this.fb.group({
        rua: [''],
        cidade: [''],
        estado: [''],
        cep: ['']
      })
    });

    this.clienteService.getClientes().subscribe(value => {
      console.log("obteve clientes");
      console.log(value);

      
    })
  }

  onSubmit() {
    // Lógica para lidar com os dados do formulário
    const formData = this.clienteForm.value;
    const enderecoData = formData.endereco;
    console.log("cadastrando ", formData)
    // SELECT "id", "nome", "cpf", "data_nascimento", "telefone", "endereco", "createdAt", "updatedAt" FROM "Clientes" AS "Cliente"
    const cliente: any = {
      "nome": formData.nome,
      "cpf": formData.cpf,
      "data_nascimento": formData.dataNascimento.toISOString(),
      "telefone": formData.telefone,
      "rua": enderecoData.rua,
      "cidade": enderecoData.cidade,
      "estado": enderecoData.estado, 
      "cep": enderecoData.cep
    }
    
    

    console.log(cliente);
    this.clienteService.cadastrarCliente(cliente).subscribe(response => {
      console.log(response);
    });
  }

}

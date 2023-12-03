import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import Funcionario from './Funcionario';
import Cliente from './Cliente';
import Equipamento from './Equipamento';

@Entity('tb_servico')

export class Servico {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 200 })
    nome: string;

    @Column("varchar", { length: 200 })
    descricao: string;

    @Column("varchar", { length: 100 })
    orcamento: string;

    @Column('date', { default: () => 'CURRENT_TIMESTAMP' })
    data_pedido: Date;

    @ManyToOne(type => Funcionario)
    @JoinColumn({ name: "funcionario", referencedColumnName: "cpf" })
    funcionario: Funcionario;

    @ManyToOne(type => Cliente)
    @JoinColumn({ name: "cliente", referencedColumnName: "cpf" })
    cliente: Cliente;

    @ManyToMany(() => Equipamento)
    @JoinTable({name : "tb_servico_equipamento", 
                joinColumn: {name: "servico_id", 
                             referencedColumnName: "id"}, 
                inverseJoinColumn: {name: "equipamento_id", 
                                    referencedColumnName: "id"}})
    equipamento: Equipamento[];
}
export default Servico;
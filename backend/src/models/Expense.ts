import { IncrementDecrementOptionsWithBy } from 'sequelize';
import { Table, Column, Model, DataType, HasMany, BelongsTo, ForeignKey }    from 'sequelize-typescript'; 
import Budget from './Budget';


@Table({
    tableName: "expenses",
})

class Expense extends Model{
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string

    @Column({
        type: DataType.DECIMAL
    })
    declare amount: number



    @ForeignKey(() => Budget)
    declare budgetId: number

    @BelongsTo(() => Budget)
    declare budget: Budget

}

export default Expense
import { Button } from "@/components/ui/button";


export default function VeiculosPage() {
    return (
        <div className="p-4">
            <Button className="bg-vermelho">
                Novo Veículo
            </Button>

            <table className="w-full shadow-md mt-4 border-collapse border border-gray-200 rounded-md">
                <thead className="p-2 bg-gray-50 ">
                    <tr className="rounded-md">
                        <th className="border-r p-2">Modelo</th> 
                        <th className="border-r p-2">Ano</th>
                        <th className="border-r p-2">Placa</th>
                        <th className="p-2">Proprietário</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border-r p-2">Mercedes-Benz A200</td>
                        <td className="border-r p-2">2020</td>
                        <td className="border-r p-2">ABC-1234</td>
                        <td className="p-2">João Silva</td>
                    </tr>
                    <tr>
                        <td className="border-r p-2">Mercedes-Benz C300</td>
                        <td className="border-r p-2">2019</td>
                        <td className="border-r p-2">DEF-5678</td>
                        <td className="p-2">Maria Oliveira</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
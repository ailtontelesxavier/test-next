import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

export default function Page() {
  return (
    <div className="grid w-full">
      <PageTitle title="Gestao de Permissao" />
      <section className="mt-3 border p-2 rounded-md w-1/2">
        <div className="flex flex-row justify-between">
            <h3>Modulo</h3>
            <Button variant={"outline"} type="button" size={"sm"} title="adicionar modulo">
                <PlusIcon className="h-4 w-4"/>
            </Button>
        </div>
        <table class="w-full">
          <thead class="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th class="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                No.
              </th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Details
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr class="bg-white">
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                <a href="#" class="font-bold text-blue-500 hover:underline">
                  10001
                </a>
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                Kring New Fit office chair, mesh + PU, black
              </td>
            </tr>
            <tr class="bg-gray-50">
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                <a href="#" class="font-bold text-blue-500 hover:underline">
                  10002
                </a>
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                Kring New Fit office chair, mesh + PU, black
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

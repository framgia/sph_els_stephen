import { TableHeader, TableBody } from '.';

interface TableProps {
  headers: React.ReactNode;
  body: React.ReactNode;
}

export default function Table({ headers, body }: TableProps): JSX.Element {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <TableHeader>{headers}</TableHeader>
              <TableBody>{body}</TableBody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

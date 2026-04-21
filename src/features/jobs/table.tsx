import moment from "moment";
import { ArrowUpRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table.tsx";
import { Button } from "../../components/ui/button.tsx";
import type { Job } from "./types";
import { truncateString } from "../../utils";

type Props = {
  jobsList: Job[];
}

export const JobsTable = (props: Props) => {
  const { jobsList } = props;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead className={'max-md:hidden'}>Company</TableHead>
          <TableHead>Location</TableHead>
          {/* {<TableHead>Language</TableHead>} */}
          {<TableHead className={'max-lg:hidden'}>Max Salary</TableHead>}
          <TableHead className={'max-lg:hidden'}>Published</TableHead>
          <TableHead className="max-w-[150px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobsList.map((item, index) => (
          <TableRow key={index} >
            <TableCell>{truncateString(item.title, 35)}</TableCell>
            <TableCell className={'max-md:hidden'}>{item.company.name}</TableCell>
            <TableCell>{truncateString(item.location, 30)}</TableCell>
            {/* <TableCell></TableCell> */}
            <TableCell className={'max-lg:hidden text-muted-foreground'}>{item.salary_max}</TableCell>
            <TableCell className={'max-lg:hidden text-muted-foreground'}>{moment(item.published).format('ll')}</TableCell>
            <TableCell className="truncate text-right">
              <Button variant={'ghost'} size={'sm'}>
                <a
                  target={'_blank'}
                  className={'text-xs'}
                  href={`${item.application_url}`}
                >
                  Apply
                  <ArrowUpRight className={'ml-1 w-4 h-4'} />
                </a>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

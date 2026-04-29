import moment from "moment";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table.tsx";
import type { Job } from "./types";
import { truncateString } from "../../utils";
import { memo } from "react";
import { Button } from "../../components/ui/button.tsx";
import { saveJob } from "../../lib/api";

type Props = {
  jobsList: Job[];
}

export const JobsTable = memo((props: Props) => {
  const { jobsList } = props;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead className={'max-md:hidden'}>Company</TableHead>
          <TableHead>Location</TableHead>
          {<TableHead>Job Type</TableHead>}
          {<TableHead className={'max-lg:hidden'}>Max Salary</TableHead>}
          <TableHead className={'max-lg:hidden'}>Published</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobsList.map((item, index) => (
          <TableRow key={index} className="cursor-pointer" >
            <TableCell>{truncateString(item.title, 35)}</TableCell>
            <TableCell className={'max-md:hidden'}>{item.company.name}</TableCell>
            <TableCell>{truncateString(item.location, 30)}</TableCell>
            <TableCell>{item.types[0].name}</TableCell>
            <TableCell className={'max-lg:hidden text-muted-foreground'}>{item.salary_max}</TableCell>
            <TableCell className={'max-lg:hidden text-muted-foreground'}>{moment(item.published).format('ll')}</TableCell>
            <TableCell>
              <Button 
                onClick={() => saveJob(item)}
                className={'bg-blue-500 text-white'}
              >Save</Button>
              <Button className={'bg-green-700 ml-2'}>
                <a
                  target={'_blank'}
                  className="text-white"
                  href={`${item.application_url}`}
                >
                  Apply
                </a>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
})

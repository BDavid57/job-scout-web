import moment from "moment";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table.tsx";
import type { Job } from "./types";
import { truncateString } from "../../utils";
import { memo, useState } from "react";
import { Button } from "../../components/ui/button.tsx";
import { useSaveJobMutation } from "./hooks";

type Props = {
  jobsList: Job[];
  savedList?: boolean;
}

export const JobsTable = memo((props: Props) => {
  const [savingId, setSavingId] = useState<string | number | null>(null);

  const { jobsList, savedList } = props;

  const { saveJob } = useSaveJobMutation();

  const handleSave = (job: Job) => {
    setSavingId(job.id);

    saveJob(job, {
      onSettled: () => {
        setSavingId(null);
      },
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead className={'max-md:hidden'}>Company</TableHead>
          <TableHead>Location</TableHead>
          {<TableHead className={'max-lg:hidden'}>Max Salary</TableHead>}
          <TableHead className={'max-lg:hidden'}>Published</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobsList.map((item) => (
          <TableRow key={item.id} className="cursor-pointer" >
            <TableCell>{truncateString(item.title, 35)}</TableCell>
            <TableCell className={'max-md:hidden'}>{item.company.name}</TableCell>
            <TableCell>{truncateString(item.location, 30)}</TableCell>
            <TableCell className={'max-lg:hidden text-muted-foreground'}>{item.salary_max}</TableCell>
            <TableCell className={'max-lg:hidden text-muted-foreground'}>{moment(item.published).format('ll')}</TableCell>
            <TableCell>
              {!savedList ?
                <Button
                  onClick={() => handleSave(item)}
                  disabled={savingId === item.id}
                  className="bg-blue-200"
                >
                  {savingId === item.id ? "Saving..." : "Save"}
                </Button> : <Button className="bg-red-200">Delete</Button>
              }
              <Button className={'bg-green-200 ml-2'}>
                <a
                  target={'_blank'}
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

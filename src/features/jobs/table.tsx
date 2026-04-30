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
  triggerDeleteMethod?: () => void;
  selectJob?: (id: number) => void;
}

export const JobsTable = memo((props: Props) => {
  const { jobsList, savedList, triggerDeleteMethod, selectJob } = props;

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const { saveJob } = useSaveJobMutation();

  const handleSave = (job: Job) => {
    setSelectedJob(job);

    saveJob(job, {
      onSettled: () => {
        setSelectedJob(null);
      },
    });
  };

  const handleDelete = (id: number) => {
    if(triggerDeleteMethod && selectJob) {
      triggerDeleteMethod()
      selectJob(id)
    }
  }

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
                  disabled={selectedJob?.id === item.id}
                  className="bg-blue-200"
                >
                  {selectedJob?.id === item.id ? "Saving..." : "Save"}
                </Button> : 
                <Button 
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-200"
                >
                  Delete
                </Button>
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

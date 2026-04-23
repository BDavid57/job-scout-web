import moment from "moment";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table.tsx";
import type { Job } from "./types";
import { truncateString } from "../../utils";
import { memo, useCallback, useState } from "react";
import { DisplayJobModal } from "./components";

type Props = {
  jobsList: Job[];
}

export const JobsTable = memo((props: Props) => {
  const { jobsList } = props;

  const [triggerDisplayJob, setTriggerDisplayJob] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | undefined>(undefined);

  const handleCloseDisplayJob = useCallback(() =>
      setTriggerDisplayJob(false), []);

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
        </TableRow>
      </TableHeader>
      <TableBody>
        {triggerDisplayJob && <DisplayJobModal selectedJob={selectedJob} closeModal={handleCloseDisplayJob} />}
        {jobsList.map((item, index) => (
          <TableRow key={index} onClick={() => {
            setSelectedJob(item)
            setTriggerDisplayJob(true)
          }} className="cursor-pointer" >
            <TableCell>{truncateString(item.title, 35)}</TableCell>
            <TableCell className={'max-md:hidden'}>{item.company.name}</TableCell>
            <TableCell>{truncateString(item.location, 30)}</TableCell>
            <TableCell>{item.types[0].name}</TableCell>
            <TableCell className={'max-lg:hidden text-muted-foreground'}>{item.salary_max}</TableCell>
            <TableCell className={'max-lg:hidden text-muted-foreground'}>{moment(item.published).format('ll')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
})

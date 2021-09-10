import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../../dummy-data';
import EventList from '../../../components/events/EventList';
import ResultsTitle from '../../../components/events/results-title';
import CustomButton from '../../../components/ui/CustomButton';
import ErrorAlert from '../../../components/ui/error-alert';

const FilteredEventsPage = () => {
  const router = useRouter();
  const filteredData = router.query.slug;

  if (!filteredData) {
    return <p className='center'>Loading...</p>;
  }

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid Filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <CustomButton path='/events'>Show All Events</CustomButton>
        </div>
      </>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No Events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <CustomButton path='/events'>Show All Events</CustomButton>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date}/>
      <EventList items={filteredEvents}/>
    </>
  );
};

export default FilteredEventsPage;
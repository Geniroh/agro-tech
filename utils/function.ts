// import dayjs from 'dayjs';
// const disabledDates = []

// export const disabledDate = current => {
//     const isBeforeToday = current && current < dayjs().startOf('day');
//     const isDisabledDate = disabledDates.some(date => current && current.isSame(date, 'day'));
//     return isBeforeToday || isDisabledDate;
// };

// export const validateEmail = (rule, value, callback) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
//     if (!value || value.match(emailRegex)) {
//       callback();
//     } else {
//       callback('Please enter a valid email address');
//     }
// };

// export const validatePhoneNumber = (rule, value, callback) => {
//     const phoneRegex = /^(?:\+?234)?(?:0)?([7-9][0-9]{9})$/;

//     if (!value || value.match(phoneRegex)) {
//       callback();
//     } else {
//       callback('Please enter a valid phone number');
//     }
// };

// export const validateDuration = (rule, value, callback) => {
//   const regex = /^(\d+)\s*(week|weeks|day|days|hr|hrs|hour|hours)$/i;
//   const match = value.match(regex);
  
//   if (!match) {
//     callback('Please enter a valid duration in the format: [number] [unit], e.g., 1 week, 2 days, 7hrs etc');
//   } else {
//     callback();
//   }
// };



// export const getDaysDifference = (startDateStr, endDateStr) => {
//     const startDate = dayjs(startDateStr);
//     const endDate = dayjs(endDateStr);
//     const daysDifference = endDate.diff(startDate, 'day');

//     if(daysDifference == 0) {
//       return 1
//     } else {
//       return daysDifference;
//     }
// }

// export const toCapitalize = (str) => {
//   if (typeof str !== 'string' || !str) {
//     return '';
//   }
//   return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
// };

// const formatDate= (date) => {
//   // return dayjs(date).format('YYYY-MM-DD HH:mm:ss.SSS');
//   return dayjs(date).format('YYYY-MM-DD');
// }

// export   const formatDateToString = (dateString) => {
//   const parsedDate = dayjs(dateString);
//   const formattedDate = parsedDate.format('ddd, MMM D YYYY');
//   return formattedDate;
// };

// export const separateDates = (datesArray) => {
//   if (datesArray.length !== 2) {
//       throw new Error('Invalid dates array. It should contain exactly 2 dates.');
//   }

//   const [firstDate, secondDate] = datesArray;

//   const startDate = formatDate(firstDate);
//   const endDate = formatDate(secondDate);

//   return { startDate, endDate };
// }

// export const adjustEndDate = (startDate, endDate) => {
//   let adjustedEndDate = endDate;
  
//   if (dayjs(startDate).isSame(endDate, 'day')) {
//     adjustedEndDate = dayjs(endDate).add(1, 'day').toDate();
//     // adjustedEndDate = dayjs(adjustedEndDate).format('YYYY-MM-DD HH:mm:ss.SSS');
//     adjustedEndDate = dayjs(adjustedEndDate).format('YYYY-MM-DD');
//   }

//   return { startDate, endDate: adjustedEndDate };
// };

// export const formatNumber = (number) => {
//   return Number(number).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
// };

// export const customDateFormat = (value) => dayjs(value).format('MMM D, YYYY')

// export const formatGuestCounts = (adults, children, nannies) => {
//   const parts = [];
//   if (adults > 0) {
//       parts.push(`${adults} Adult${adults > 1 ? 's' : ''}`);
//   }
//   if (children > 0) {
//       parts.push(`${children} Child${children > 1 ? 'ren' : ''}`);
//   }
//   if (nannies > 0) {
//       parts.push(`${nannies} Nanny${nannies > 1 ? 's' : ''}`);
//   }
//   return parts.join(', ');
// };

export const splitFullName = (fullName:string | null | undefined) => {
    if(!fullName) return "" 
  const names = fullName.trim().split(/\s+/);

  const firstName = names[0] ? names[0][0].toUpperCase() + names[0].slice(1).toLowerCase() : '';
  const lastName = names[1] ? names[1][0].toUpperCase() + names[1].slice(1).toLowerCase() : '';

  return [firstName, lastName];
}

export const getFirstName = (fullName: string | undefined | null) => {
    if(!fullName) return "" 
    const names = fullName.trim().split(/\s+/);

    const firstName = names[0] ? names[0][0].toUpperCase() + names[0].slice(1).toLowerCase() : '';

    return firstName;
}
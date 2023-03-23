// MongoDB stores Date but when sent to Frontend it converts it to String, bcoz JSON does'nt have Date type, Thus implicitely converting the data recieved into Date type using this utility function
export const convertToDate = (data) => {
    const newArr = data.map(obj => {
        return {
            ...obj,
            date: new Date(obj.date)
        };
    });
    return newArr
}


// Utility Function to sort Data based on Months and Dates
export const sortData = (data) => {
    data.sort((a, b) => {
        const dateA = a.date;
        const dateB = b.date;

        // Compare the months first
        const monthDiff = dateA.getMonth() - dateB.getMonth();
        if (monthDiff !== 0) {
            return monthDiff;
        }

        // If the months are the same, compare the days
        const dayDiff = dateA.getDate() - dateB.getDate();
        return dayDiff;
    });
}

// Utility Function to Uppercase first letter
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Utility function to format date for displaying in Table in frontend
export const formatDate = (date) => {
    const formattedDateObj = new Date(date);
    const options = {
        day: 'numeric',
        month: "long"
    };

    const formattedDateStr = formattedDateObj.toLocaleDateString('en-US', options);
    return formattedDateStr
}

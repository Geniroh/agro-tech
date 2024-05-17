export const getFirstName = (fullName: string | undefined | null) => {
    if(!fullName) return "" 
    const names = fullName.trim().split(/\s+/);

    const firstName = names[0] ? names[0][0].toUpperCase() + names[0].slice(1).toLowerCase() : '';

    return firstName;
}

export const generateArrayFromNumber = (number: number) => {
  if (number > 0) {
    const newArray = Array.from({ length: number }, (_, i) => i + 1);
    return newArray
  } else {
    return []
  }
}
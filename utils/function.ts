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

export const knumberformatter = (num: number): string => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  } else {
    return num.toString();
  }
}

export function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


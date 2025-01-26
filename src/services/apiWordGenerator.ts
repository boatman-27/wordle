const apiURL = "https://random-word.ryanrk.com/api/en/word/random/?length=5";

export const generateWord = async (): Promise<string> => {
  const regex = /^[A-Za-z]+$/;
  const fetchWord = async (): Promise<string> => {
    const res = await fetch(`${apiURL}`, {
      method: "GET",
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Couldn't Fetch Word");
    }

    const data: string[] = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Unexpected API response format");
    }

    return data[0];
  };

  let word = "";
  let isValid = false;
  while (!isValid) {
    try {
      word = await fetchWord();
      isValid = regex.test(word);
    } catch (error) {
      console.log("Error fetching word:", error);
      throw error;
    }
  }

  return word;
};

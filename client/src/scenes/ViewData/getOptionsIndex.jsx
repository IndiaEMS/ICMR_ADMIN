const getOptionsIndex = (data) => {
    return data
      ?.map((value, index) => (value ? index + 1 : null))
      .filter((index) => index !== null)
      .join(", ");
  };

export default getOptionsIndex;
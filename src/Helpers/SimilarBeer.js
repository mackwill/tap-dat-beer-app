function newEuclidean(mainBeer, beer) {
  let typeSumSquare = 0;
  let brandSumSquare = 0;
  let ibvSumSquare = 0;

  if (beer.type === mainBeer.type) {
    typeSumSquare += 1;
  }
  if (beer.brewery === mainBeer.brewery) {
    brandSumSquare += 1;
  }
  if (beer.abv === mainBeer.abv) {
    ibvSumSquare += 1;
  }

  var distance = Math.sqrt((typeSumSquare + brandSumSquare + ibvSumSquare) / 3);
  var similarityScore = distance;
  return similarityScore;
}

function find9ClosestNeighbour(beer, beers) {
  const stats = [];
  beers.forEach((elm) => {
    stats.push({
      id: elm.id,
      distance: newEuclidean(beer, elm),
    });
  });
  function compare(a, b) {
    if (a.distance > b.distance) {
      return -1;
    }
    if (a.distance < b.distance) {
      return 1;
    }
    return 0;
  }
  const sortedStats = stats.sort(compare);
  return sortedStats.slice(0, 6).map((elm) => elm.id);
}

export const getSimilarBeers = (currentBeer, otherBeers) => {
  const similarBeers = otherBeers.filter((elm) =>
    find9ClosestNeighbour(currentBeer, otherBeers).includes(elm.id)
  );
  return similarBeers;
};

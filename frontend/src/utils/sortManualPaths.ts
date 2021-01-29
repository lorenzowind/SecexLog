import { PathsCard } from '../hooks/searchResult';

import compareTime from './compareTime';

interface SortManualPathsParams {
  operation: 'cost' | 'fast' | 'safety';
  paths: PathsCard[];
}

export default function sortManualPaths({
  operation,
  paths,
}: SortManualPathsParams): PathsCard[] {
  const auxPaths = paths;
  let auxPath: PathsCard;

  for (let i = 1; i < auxPaths.length; i += 1) {
    for (let j = 0; j < auxPaths.length - i; j += 1) {
      switch (operation) {
        case 'cost': {
          if (Number(auxPaths[j].price) > Number(auxPaths[j + 1].price)) {
            auxPath = auxPaths[j];
            auxPaths[j] = auxPaths[j + 1];
            auxPaths[j + 1] = auxPath;
          }

          break;
        }
        case 'fast': {
          if (
            compareTime(
              auxPaths[j].paths[auxPaths[j].paths.length - 1].selected_period
                .selected_final_time,
              auxPaths[j + 1].paths[auxPaths[j + 1].paths.length - 1]
                .selected_period.selected_final_time,
            ) === 1
          ) {
            auxPath = auxPaths[j];
            auxPaths[j] = auxPaths[j + 1];
            auxPaths[j + 1] = auxPath;
          }

          break;
        }
        case 'safety': {
          if (
            auxPaths[j].modal_safety_factor <
            auxPaths[j + 1].modal_safety_factor
          ) {
            auxPath = auxPaths[j];
            auxPaths[j] = auxPaths[j + 1];
            auxPaths[j + 1] = auxPath;
          }

          break;
        }
        default: {
          break;
        }
      }
    }
  }

  return auxPaths;
}

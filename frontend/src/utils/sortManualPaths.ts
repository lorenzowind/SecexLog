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

  for (let i = 1; i < auxPaths.length; i += 1) {
    for (let j = 0; j < auxPaths.length - 1; j += 1) {
      let auxPath: PathsCard | null = null;

      switch (operation) {
        case 'cost': {
          if (auxPaths[i].paths.length > 1) {
            if (auxPaths[i].price < auxPaths[j].price) {
              auxPath = auxPaths[j];
            }
          } else if (auxPaths[i].price > auxPaths[j].price) {
            auxPath = auxPaths[j];
          }

          break;
        }
        case 'fast': {
          if (
            compareTime(
              auxPaths[i].paths[auxPaths[j].paths.length - 1].selected_period
                .selected_final_time,
              auxPaths[j].paths[auxPaths[i].paths.length - 1].selected_period
                .selected_final_time,
            ) === -1
          ) {
            auxPath = auxPaths[j];
          }

          break;
        }
        case 'safety': {
          if (
            auxPaths[j].modal_safety_factor < auxPaths[i].modal_safety_factor
          ) {
            auxPath = auxPaths[j];
          }

          break;
        }
        default: {
          break;
        }
      }

      if (auxPath) {
        auxPaths[j] = auxPaths[i];
        auxPaths[i] = auxPath;
      }
    }
  }

  return auxPaths;
}

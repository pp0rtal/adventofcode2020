import { expect } from 'chai';

import {browseMap} from "../src/day03trajectory";

describe('Day 3: Toboggan Trajectory', () => {
    describe('#browseMap', () => {
        it('should return 0 for empty map', () => {
            const map = '';

            expect(browseMap(map.split('\n'))).to.equal(0);
        });

        it('should not count the first line tree', () => {
            const map = '#\n#';

            expect(browseMap(map.split('\n'))).to.equal(1);
        });

        it('should return total trees for specific example', () => {
            const map = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;

            expect(browseMap(map.split('\n'))).to.equal(7);
        });

        it('should count total trees using pattern right=1 down=2', () => {
            const map = '#\n#\n#';

            expect(browseMap(map.split('\n'), 1, 2)).to.equal(1);
        });
    });
});

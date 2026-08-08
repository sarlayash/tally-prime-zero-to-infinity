import test from 'node:test';
import assert from 'node:assert/strict';
import {freshProgress,award,completeLevel,requirementsMet,unlockedBadges} from '../lib/course.mjs';
test('each activity awards only once',()=>{let s=freshProgress('Kapil');s=award(s,'practice');s=award(s,'practice');assert.equal(s.xp,50);assert.equal(s.fragments,8)});
test('a level cannot complete until all requirements are met',()=>{const s=completeLevel(freshProgress());assert.equal(s.currentLevel,1);assert.match(s.error,/Complete/)});
test('completion unlocks exactly one next level',()=>{let s=freshProgress();for(const a of ['practice','quiz','journal'])s=award(s,a);assert.equal(requirementsMet(s),true);s=completeLevel(s);assert.equal(s.currentLevel,2);assert.equal(s.unlockedLevel,2);assert.equal(s.xp,105);assert.equal(s.fragments,17)});
test('level seven creates graduation state',()=>{let s={...freshProgress(),currentLevel:7,unlockedLevel:7};for(const a of ['practice','quiz','journal'])s=award(s,a);s=completeLevel(s);assert.equal(s.graduated,true);assert.equal(s.currentLevel,7)});
test('badges unlock from actual fragments',()=>{assert.deepEqual(unlockedBadges(24),[]);assert.deepEqual(unlockedBadges(100),['Explorer','Ledger Master'])});

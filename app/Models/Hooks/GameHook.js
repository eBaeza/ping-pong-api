'use strict'

const GameHook = {}

GameHook.setResult = async modelInstance => {
  if (modelInstance.player_score > modelInstance.opponent_score) {
    modelInstance.result = 'W'
  } else if (modelInstance.player_score < modelInstance.opponent_score) {
    modelInstance.result = 'L'
  } else {
    modelInstance.result = 'D'
  }
}

module.exports = GameHook

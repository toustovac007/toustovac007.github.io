function hitEvaluation (damage, armor, damageType, crit, defendingMonster) {
    switch (damageType) {
      case "slashing":
        slashingDamage (damage, armor, crit, defendingMonster);
      break;
  
      case "piercing":
        piercingDamage (damage, armor, crit, defendingMonster);
      break;
  
      case "bludgeoning":
        piercingDamage (damage, armor, crit, defendingMonster);
      break;
  
      default:
        slashingDamage (damage, armor, crit, defendingMonster);
      break;
    }
  }
  
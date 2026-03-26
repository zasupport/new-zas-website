"""
community_answer_generator.py — Compatibility shim.
Python module names cannot contain hyphens, so this shim re-exports
everything from community-answer-generator.py using importlib.

Import as: from community_answer_generator import generate_answer
"""
import importlib.util
import sys
from pathlib import Path

_file = Path(__file__).parent / "community-answer-generator.py"
_spec = importlib.util.spec_from_file_location("_community_answer_generator_impl", _file)
if _spec is None:
    raise ImportError(f"Cannot find community-answer-generator.py at {_file}")
_mod = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_mod)  # type: ignore[union-attr]

# Re-export everything
generate_answer = _mod.generate_answer
is_sa_relevant = _mod.is_sa_relevant
classify_question = _mod.classify_question
build_prompt = _mod.build_prompt
remove_ai_tells = _mod.remove_ai_tells
humanise = _mod.humanise
ZA_CONTEXT = _mod.ZA_CONTEXT
GENERIC_CONTEXT = _mod.GENERIC_CONTEXT

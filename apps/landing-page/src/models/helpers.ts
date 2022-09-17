import { getRoot, IAnyStateTreeNode } from "mobx-state-tree"
import { RealRootModelInstance } from "./root"

export function getRootStore(node: IAnyStateTreeNode): RealRootModelInstance {
	return getRoot(node) as RealRootModelInstance
}

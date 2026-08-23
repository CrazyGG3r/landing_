"""Export the supplied rigged astronaut and deterministic pose library.

The editable Blender source remains untouched. This exporter keeps the armature
and skin, parents the rigid helmet to the head bone, adds a small collection of
one-frame pose actions, and creates a texture/mesh-optimized GLB for the About
page. The web scene can clone the rig safely and choose one pose per person.
"""

import math
import os
import sys

import bmesh
import bpy


POSES = {
    "POSE_00_STEWARD": {
        "upper_arm.L": (0, 0, 58),
        "upper_arm.R": (0, 0, -58),
        "forearm.L": (0, 0, 14),
        "forearm.R": (0, 0, -14),
    },
    "POSE_01_OPEN": {
        "upper_arm.L": (0, -8, 24),
        "upper_arm.R": (0, 8, -24),
        "forearm.L": (0, 0, 12),
        "forearm.R": (0, 0, -12),
        "spine.002": (0, 0, -3),
    },
    "POSE_02_WAVE": {
        "upper_arm.L": (12, -10, 72),
        "upper_arm.R": (-12, -2, -24),
        "forearm.L": (0, 10, -78),
        "forearm.R": (0, 0, -24),
        "hand.L": (0, 18, 5),
    },
    "POSE_03_POINT": {
        "upper_arm.L": (0, -8, 68),
        "forearm.L": (0, 0, 38),
        "upper_arm.R": (0, 3, -5),
        "forearm.R": (0, 0, -8),
        "spine.003": (0, 0, -4),
    },
    "POSE_04_READY": {
        "upper_arm.L": (8, 0, 54),
        "upper_arm.R": (-8, 0, -54),
        "forearm.L": (8, 0, 44),
        "forearm.R": (-8, 0, -44),
        "thigh.L": (0, 0, -4),
        "thigh.R": (0, 0, 4),
    },
    "POSE_05_SALUTE": {
        "upper_arm.L": (0, -4, 70),
        "forearm.L": (0, 0, 18),
        "upper_arm.R": (-8, -8, -42),
        "forearm.R": (5, 12, -92),
        "hand.R": (0, -18, 8),
    },
    "POSE_06_LEAN": {
        "upper_arm.L": (4, -4, 48),
        "upper_arm.R": (-4, 4, -63),
        "forearm.L": (0, 0, 25),
        "forearm.R": (0, 0, -52),
        "spine": (0, 0, 3),
        "spine.002": (0, 0, 5),
        "thigh.L": (0, 0, -5),
        "thigh.R": (0, 0, 4),
    },
    "POSE_07_SIGNAL": {
        "upper_arm.L": (0, -10, 12),
        "upper_arm.R": (0, 8, -78),
        "forearm.L": (0, 0, 18),
        "forearm.R": (0, -8, 54),
        "hand.R": (0, 15, 0),
    },
    "POSE_08_THINK": {
        "upper_arm.L": (0, 0, 63),
        "forearm.L": (8, -4, 72),
        "upper_arm.R": (0, 0, -44),
        "forearm.R": (-8, 5, -70),
        "spine.003": (0, 0, 3),
    },
    "POSE_09_PRESENT": {
        "upper_arm.L": (0, -7, 34),
        "forearm.L": (0, 0, 12),
        "upper_arm.R": (0, 10, -74),
        "forearm.R": (0, 0, -28),
        "spine.002": (0, 0, -3),
    },
}


def script_args():
    marker = sys.argv.index("--") if "--" in sys.argv else len(sys.argv)
    args = sys.argv[marker + 1 :]
    if not args:
        raise SystemExit("Expected an output .glb path after --")
    return os.path.abspath(args[0])


def optimize_images():
    for image in bpy.data.images:
        if image.name in {"Render Result", "Viewer Node"}:
            continue
        width, height = image.size
        longest_edge = max(width, height)
        if longest_edge > 1024:
            ratio = 1024 / longest_edge
            image.scale(max(1, round(width * ratio)), max(1, round(height * ratio)))


def optimize_helmet(helmet):
    bpy.ops.object.select_all(action="DESELECT")
    helmet.select_set(True)
    bpy.context.view_layer.objects.active = helmet
    modifier = helmet.modifiers.new("Web optimization", "DECIMATE")
    modifier.ratio = 0.3
    modifier.use_collapse_triangulate = True
    bpy.ops.object.modifier_apply(modifier=modifier.name)


def enable_helmet_backface_culling(helmet):
    """Keep Blender and the exported glTF helmet single-sided."""
    materials = {
        slot.material
        for slot in helmet.material_slots
        if slot.material is not None
    }
    if not materials:
        raise SystemExit("The helmet has no material to enable back-face culling on")

    for material in materials:
        material.use_backface_culling = True
        if hasattr(material, "use_backface_culling_shadow"):
            material.use_backface_culling_shadow = True


def normalize_mesh_faces(mesh_object):
    """Make connected face winding consistent before glTF computes normals."""
    mesh = mesh_object.data
    editable_mesh = bmesh.new()
    editable_mesh.from_mesh(mesh)
    bmesh.ops.recalc_face_normals(editable_mesh, faces=list(editable_mesh.faces))
    editable_mesh.to_mesh(mesh)
    editable_mesh.free()
    mesh.validate(clean_customdata=False)
    mesh.update()


def attach_helmet_to_head(helmet, armature):
    world_matrix = helmet.matrix_world.copy()
    helmet.parent = armature
    helmet.parent_type = "BONE"
    helmet.parent_bone = "spine.006"
    helmet.matrix_world = world_matrix


def reset_pose(armature):
    for bone in armature.pose.bones:
        bone.rotation_mode = "XYZ"
        bone.rotation_euler = (0, 0, 0)
        bone.location = (0, 0, 0)
        bone.scale = (1, 1, 1)


def create_pose_actions(armature):
    armature.animation_data_create()

    for action_name, rotations in POSES.items():
        reset_pose(armature)
        action = bpy.data.actions.new(action_name)
        armature.animation_data.action = action

        for bone_name, degrees in rotations.items():
            bone = armature.pose.bones.get(bone_name)
            if bone:
                bone.rotation_euler = tuple(math.radians(value) for value in degrees)

        for bone in armature.pose.bones:
            bone.keyframe_insert("rotation_euler", frame=1, group=bone.name)
            bone.keyframe_insert("rotation_euler", frame=2, group=bone.name)

        action.use_fake_user = True

    armature.animation_data.action = bpy.data.actions["POSE_00_STEWARD"]
    bpy.context.scene.frame_start = 1
    bpy.context.scene.frame_end = 2
    bpy.context.scene.frame_set(1)


def main():
    output_path = script_args()
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    armature = bpy.data.objects.get("metarig")
    body = bpy.data.objects.get("main")
    helmet = bpy.data.objects.get("helmet")
    if not armature or not body or not helmet:
        raise SystemExit("Could not find metarig/main/helmet in the supplied source")

    optimize_images()
    optimize_helmet(helmet)
    enable_helmet_backface_culling(helmet)
    normalize_mesh_faces(body)
    normalize_mesh_faces(helmet)
    attach_helmet_to_head(helmet, armature)
    create_pose_actions(armature)

    bpy.ops.object.select_all(action="DESELECT")
    for obj in (armature, body, helmet):
        obj.hide_viewport = False
        obj.hide_render = False
        obj.select_set(True)
    bpy.context.view_layer.objects.active = armature

    bpy.ops.export_scene.gltf(
        filepath=output_path,
        export_format="GLB",
        use_selection=True,
        export_animations=True,
        export_animation_mode="ACTIONS",
        export_frame_range=True,
        export_force_sampling=True,
        export_optimize_animation_size=True,
        export_def_bones=True,
        export_skins=True,
        export_cameras=False,
        export_lights=False,
        export_yup=True,
        export_apply=False,
        export_texcoords=True,
        export_normals=True,
        export_materials="EXPORT",
        export_image_format="WEBP",
        export_image_quality=78,
    )

    print(f"ABOUT_RIGGED_AVATAR_EXPORTED={output_path}")


if __name__ == "__main__":
    main()
